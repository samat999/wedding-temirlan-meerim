import qrcode from 'qrcode-terminal';
import os from 'os';
import { exec } from 'child_process';

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
}

const port = 5173;
const ip = getLocalIp();
const url = `http://${ip}:${port}`;

console.log(`📡 Сервер доступен по адресу: ${url}`);
qrcode.generate(url, { small: true });

exec(`vite --host --port ${port}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`Ошибка запуска Vite: ${err}`);
  } else {
    console.log(stdout);
  }
});
