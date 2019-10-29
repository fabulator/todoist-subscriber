import { Kafka, KafkaConfig, Producer } from 'kafkajs';
import { Service, Inject } from 'typedi';
import { QueueProviderInterface } from '../QueueProviderInterface';
import { HookBody } from '../../hook/types';

@Service()
export default class KafkaProvider implements QueueProviderInterface {
    protected producer: Producer;

    constructor(@Inject('queue.providers.kafka.options') options: KafkaConfig) {
        this.producer = (new Kafka(options)).producer();
    }

    public async push(data: HookBody) {
        await this.producer.connect();
        await this.producer.send({
            topic: data.event_name.replace(':', '-'),
            messages: [
                { value: JSON.stringify(data) },
            ],
        });
    }
}
