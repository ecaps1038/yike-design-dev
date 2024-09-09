import { deepClone, getObjVal } from '@yike-design/ui/components/utils';

describe('tools', () => {
  it('getObjVal', () => {
    const obj = {
      a: {
        b: {
          c: 'c',
        },
      },
      e: {
        f: [{ g: 'g' }],
      },
    };

    expect(getObjVal(obj, 'a.b.c').value).toBe('c');
    expect(getObjVal(obj, ['a', 'b', 'c']).value).toBe('c');
    expect(getObjVal(obj, 'e.f[0].g').value).toBe('g');
    expect(getObjVal(obj, ['e', 'f', '0', 'g']).value).toBe('g');

    getObjVal(obj, 'a.b.c').value = 'c1';
    expect(getObjVal(obj, 'a.b.c').value).toBe('c1');
    getObjVal(obj, ['a', 'b', 'c']).value = 'c2';
    expect(getObjVal(obj, ['a', 'b', 'c']).value).toBe('c2');
    getObjVal(obj, 'e.f[0].g').value = 'g1';
    expect(getObjVal(obj, 'e.f[0].g').value).toBe('g1');
    getObjVal(obj, ['e', 'f', '0', 'g']).value = 'g2';
    expect(getObjVal(obj, ['e', 'f', '0', 'g']).value).toBe('g2');
  });

  it('deepClone', () => {
    const obj = { a: 1, b: { c: 2 }, d: [{ e: '3' }] };
    const obj2 = deepClone(obj);

    expect(obj.b).not.toBe(obj2.b);
    expect(obj).toStrictEqual(obj2);
    expect(obj.d).not.toBe(obj2.d);

    expect(1).toBe(deepClone(1));
  });
});
