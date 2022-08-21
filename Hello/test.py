import asyncio

async def foo():
    return 'Hello!'

async def baz():
    s = await foo()
    return s

asyncio.run(print(baz()))