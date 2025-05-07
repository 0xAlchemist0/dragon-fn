class Write {
  public provider = null;
  public account = null;
  public constructor(provider: any, account: any) {
    this.provider = provider;
    this.account = account;
  }

  public createLock(_value: number, _unlockTime: number) {
    return null;
  }

  public extendLockTime(_unlockTime: number) {
    return null;
  }

  public increaseLockAmount(_value: number) {
    return null;
  }
}
