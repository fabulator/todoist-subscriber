import { Container } from 'typedi';
import { PROVIDERS } from 'queue';

Container.set('queue.providers.bull.options', ['todoist', 'redis://redis.docker:6379']);
Container.set('queue.provider', Container.get(PROVIDERS.BullProvider));
