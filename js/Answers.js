var Answers = {

    //returned values are constant if the same id is passed
    //this is done so that the string does not change between redraws
    getCorrectStr: function (id) {
        var correct_strs = ["Correct.", "Right!", "Yes.", "Indeed.", "You are right."];
        return correct_strs[id % correct_strs.length];
    },

    getWrongStr: function (id) {
        var wrong_strs = ["Wrong.", "Sorry.", "No.", "Oops!"];
        return wrong_strs[id % wrong_strs.length];
    },

    getShortAnswer: function (correct_answer, answer, id) {
        if (correct_answer === answer)
            return this.getCorrectStr(id) + " It is " + answer;
        else
            return this.getWrongStr(id) + " It is not " + answer;
    },

    getLongAnswer: function (correct_answer, answer, id, icorrect) {
        var correct = icorrect;
        if (correct === undefined)
            correct = (correct_answer === answer);

        var text = (correct ? this.getCorrectStr(id) : this.getWrongStr(id)) + "<br>"
            + "It is " + correct_answer;
        if (!correct)
            text += ", not " + answer;
        return text;
    }
};
