// Source
import { Stack } from '../../src/structures/Stack';

// Constants
import { TEST_CONSTANTS } from '../constants';

const { Ax, Ay, Az, Aw, Bx, By, Bz, Bw } = TEST_CONSTANTS;

let stack = new Stack();

// Suite
describe('Stack', () => {
  it('should instantiate a new Stack', () => {
    expect.assertions(1);

    stack = new Stack();

    expect(stack).toBeInstanceOf(Stack);
  });

  it('should be able to push a value onto the stack', () => {
    expect.assertions(2);

    stack.push({ Ax, Ay });
    stack.push({ Az, Aw });
    stack.push({ Bx, By });
    stack.push({ Bz, Bw });

    // @ts-ignore possibly null
    expect(stack.getList.head.value).toEqual({ Bz, Bw });

    // @ts-ignore possibly null
    expect(stack.getList.tail.value).toEqual({ Ax, Ay });
  });

  it('should be able to pop a value off of the stack', () => {
    expect.assertions(14);

    // @ts-ignore possibly null
    expect(stack.getList.head.value).toEqual({ Bz, Bw });

    // @ts-ignore possibly null
    expect(stack.pop().value).toEqual({ Bz, Bw });

    // @ts-ignore possibly null
    expect(stack.getList.tail.value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.getList.head.value).toEqual({ Bx, By });

    // @ts-ignore possibly null
    expect(stack.getList.tail.value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.pop().value).toEqual({ Bx, By });

    // @ts-ignore possibly null
    expect(stack.getList.head.value).toEqual({ Az, Aw });

    // @ts-ignore possibly null
    expect(stack.getList.tail.value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.pop().value).toEqual({ Az, Aw });

    // @ts-ignore possibly null
    expect(stack.getList.head.value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.getList.tail.value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.pop().value).toEqual({ Ax, Ay });

    // @ts-ignore possibly null
    expect(stack.getList.head).toEqual(null);

    // @ts-ignore possibly null
    expect(stack.getList.tail).toEqual(null);
  });
});
