module.exports = function check(str, bracketsConfig) {
    const openBracketsStack = [];
    const openBracketsConfig = bracketsConfig.map((value) => value[0]);
    const closeBracketsConfig = bracketsConfig.map((value) => value[1]);

    const bracketsConfigMap = {};
    for (let i = 0; i < openBracketsConfig.length; i++) {
        bracketsConfigMap[openBracketsConfig[i]] = closeBracketsConfig[i];
    }

    const pushesWithIndexes = [];
    for (let i = 0; i < str.length; i++) {
        if (openBracketsConfig.includes(str[i])) {
            if (
                openBracketsStack[openBracketsStack.length - 1] == str[i] &&
                bracketsConfigMap[str[i]] == str[i]
            ) {
                let lastSameBracketIndex =
                    pushesWithIndexes.lastIndexOf(str[i]) + 1;
                let sliceFromLastToCurrent = str.slice(
                    pushesWithIndexes[lastSameBracketIndex],
                    i - 1
                );
                if (sliceFromLastToCurrent.length % 2 != 0) {
                    return false;
                } else {
                    openBracketsStack.pop();
                }
            } else {
                openBracketsStack.push(str[i]);
                pushesWithIndexes.push(str[i], i);
            }
        } else {
            let currentCloseBracket = str[i];
            let currentOpenBracket = openBracketsStack.pop();
            if (currentCloseBracket == bracketsConfigMap[currentOpenBracket]) {
                continue;
            } else {
                return false;
            }
        }
    }
    return openBracketsStack.length == 0 ? true : false;
};
