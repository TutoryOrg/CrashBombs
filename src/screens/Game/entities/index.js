import Matter from 'matter-js';
import Bird from '../components/Bird';


export default restart => {
    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;

    world.gravity.y = 0.4;

    return {
        physics: { engine, world },
        Bird: Bird(world, undefined, { x: 50, y: 200 }, { width: 50, height: 50 }),
    }
}