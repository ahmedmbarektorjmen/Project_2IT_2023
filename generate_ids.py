import random


def generate_id():
    return random.randint(10**14, 10**15-1)


while True:
    print(generate_id())
