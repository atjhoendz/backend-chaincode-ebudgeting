import 'dotenv';

export class EnvConfig {
  // NODE
  public static NODE_ENV = process.env['NODE_ENV'] || 'LOCAL';
  public static PORT = process.env['PORT'] || 3000;

  // FABRIC
  public static PEER_HOST = process.env['PEER_HOST'] || 'localhost';
  public static ORDERER_HOST = process.env['ORDERER_HOST'] || 'localhost';
  public static CA_HOST = process.env['CA_HOST'] || 'localhost';
}
