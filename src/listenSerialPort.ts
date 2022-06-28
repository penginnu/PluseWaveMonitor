import { ReadlineParser, SerialPort,  } from 'serialport';

export function listenSerialPort(port: string, baudRate: number = 9600, callback: (data: string) => void) {
  // シリアルポートを開く
  const serialPort = new SerialPort({
    path: port,
    baudRate: baudRate
  });

  // パーサーの設定をする
  const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));

  // 測定データの微分の為の保存用配列
  let buffer: number[] = [];

  // データを受信した時に呼び出される
  parser.on('data', (data: string) => {
    // 測定データを一時保存
    const pluseVoltage: number = Number(data);
    // 測定データをバッファに追加
    buffer.push(pluseVoltage);

    // 測定データのバッファの最大量の管理
    if (buffer.length > 3) {
      buffer.shift();
    }

    // 微分する
    const diff: number = buffer[buffer.length - 1] - buffer[buffer.length - 2];
    const differential: number = diff / 100;

    // 微分データをコールバック関数に渡す
    callback(differential.toString());
    
    // 取得データをコンソールに出力
    console.log("生データ: " + pluseVoltage, "加速度脈波: " + differential);
  });
}