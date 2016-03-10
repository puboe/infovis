
def count_frequency():
    words = {}

    with open("definitions.txt", "r") as f:
        for line in f:
            a = line.split()

            for x in a:
                x = x.lower()
                if not x.isalpha():
                    #TODO Remove non alpha characters.

                if x in words:
                    words[x] += 1
                else:
                    words[x] = 1

        for w in words:
            print w + ": " + str(words[w])

    output_word_frequency(words)


def output_word_frequency(words):
    output = open("output.txt", "w")
    out = "["
    for x in words:
        out += "{\"word\":\"" + str(x) + "\",\"count\":" + str(words[x]) + "},"

    # Delete last comma.
    out = out[:-1]
    out += "]"
    output.write(out)

if __name__ == '__main__':
    count_frequency()
