import { Controller, Get } from 'routing-controllers';

@Controller()
export default class HealthyController {
    @Get('/-/healthy')
    async get() {
        return { message: 'Feeling good' };
    }
}
