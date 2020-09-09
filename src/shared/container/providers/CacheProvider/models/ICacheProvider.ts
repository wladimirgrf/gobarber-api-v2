export default interface ICacheProvider {
  recover<T>(key: string): Promise<T | null>;
  save(key: string, value: unknown): Promise<void>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
