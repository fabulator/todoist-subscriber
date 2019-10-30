import { Container } from 'typedi';
import { PROVIDERS } from './queue';

Container.set('queue.provider', Container.get(PROVIDERS.DevNullProvider));
