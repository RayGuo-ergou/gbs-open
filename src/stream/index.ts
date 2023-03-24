import { env } from '@/config';
import { getRaidTweetChClient } from '@/redis';
import { sendToAll } from './wss/all';
import { server } from './server';

/**
 * WebSocketで全救援を配信するサーバー
 */

async function main() {
  server.listen(Number.parseInt(env.STREAM_PORT));

  server.on('listening', () => {
    console.log(`🚀 listening... :${env.STREAM_PORT}`);
  });

  const subRedis = getRaidTweetChClient();
  subRedis.on('tweet', (mini) => {
    sendToAll({
      type: 't',
      data: mini,
    });
  });
}

main();
