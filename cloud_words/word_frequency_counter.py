
def count_frequency():
    words = {}

    with open("definitions.txt", "r") as f:
        for line in f:
            a = line.split()

            for x in a:
                x = extract_alphanumeric(x)
                if len(x) > 3:
                    x = x.lower()
                    if x in words:
                        words[x] += 1
                    else:
                        words[x] = 1

        for w in words:
            print w + ": " + str(words[w])

    output_word_frequency(words)

def extract_alphanumeric(input_string):
    from string import ascii_letters, digits
    return "".join([ch for ch in input_string if ch in (ascii_letters + digits)])

def output_word_frequency(words):
    output = open("word_frequency.json", "w")
    out = "["
    for x in words:
        out += "{\"word\":\"" + str(x) + "\",\"count\":" + str(words[x]) + "},"

    # Delete last comma.
    out = out[:-1]
    out += "]"
    output.write(out)

if __name__ == '__main__':
    count_frequency()
