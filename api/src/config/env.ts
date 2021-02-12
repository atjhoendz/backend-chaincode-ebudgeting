export class EnvConfig {
  // NODE
  public static NODE_ENV = process.env['NODE_ENV'] || 'LOCAL';
  public static PORT = process.env['PORT'] || 3000;
  public static JWT_SECRET = process.env['JWT_SECRET'] || 'secret';
  public static JWT_EXPIRESTIME = process.env.JWT_EXPIRESTIME || '1h';

  // FABRIC
  public static PEER_HOST = process.env['PEER_HOST'] || 'localhost';
  public static ORDERER_HOST = process.env['ORDERER_HOST'] || 'localhost';
  public static CA_HOST = process.env['CA_HOST'] || 'localhost';
  public static TRUSTEDROOTS_CAORG1 = process.env['TRUSTEDROOTS_CAORG1'] || '';
}
