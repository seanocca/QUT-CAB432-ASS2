/**
 * Created by user on 2018/6/8/008.
 */

/**
 * check if n include any of ...p
 */
export function hexAndAny(n: number, p?: number, ...argv: number[]): number
export function hexAndAny(n: number, ...argv: number[])
{
	if (!argv.length)
	{
		return n;
	}

	for (let v of argv)
	{
		let r = (n & v);

		if (r)
		{
			return r;
		}
	}

	return 0;
}

/**
 * @deprecated i can't remember why write this
 */
export function hexAnd(n: number, p?: number, ...argv: number[]): number
export function hexAnd(n: number, ...argv: number[])
{
	if (argv.length)
	{
		let r = 0;

		for (let v of argv)
		{
			let p = n & v;

			if (!p)
			{
				return 0;
			}

			r |= v;
		}

		return r;
	}

	return n;
}

/**
 * hex => hex string
 */
export function toHex(p: number, padLen: number = 4, prefix: string = '0x')
{
	return prefix + p
		.toString(16)
		.padStart(padLen || 0, '0')
		.toUpperCase()
		;
}

/**
 * return n | p
 */
export function hexAdd(n: number, p?: number, ...argv: number[]): number
export function hexAdd(n: number, ...argv: number[]): number
{
	if (argv.length)
	{
		let r = n;

		for (let v of argv)
		{
			r |= v;
		}

		return r;
	}

	return n;
}

/**
 * return n ^ p
 */
export function hexSub(n: number, p?: number, ...argv: number[]): number
export function hexSub(n: number, ...argv: number[]): number
{
	if (argv.length)
	{
		let r = n;

		for (let v of argv)
		{
			r ^= v;
		}

		return r;
	}

	return n;
}

/**
 * check if n include v, or n === r
 * by default r = n
 */
export function hexHas(n: number, v: number, r?: number)
{
	if (typeof r === 'undefined' || r === null)
	{
		r = n;
	}

	return (n & v) || (v && v === r);
}

/**
 * if ...p include in n, than n ^ p
 */
export function hexAndSub(n: number, p?: number, ...argv: number[]): number
export function hexAndSub(n: number, ...argv: number[]): number
{
	if (argv.length)
	{
		let r = n;

		for (let v of argv)
		{
			let p = hexHas(r, v);

			if (p)
			{
				r ^= v;
			}
		}

		return r;
	}

	return n;
}

import * as self from './index';
export default self;

