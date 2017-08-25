/**
 * Created by Iwan on 23.08.2017.
 */

define("ChordSequenceType", ["Constants", "RandomUtil", "ChordType"], function (Constants, RandomUtil, ChordType) {

    return {
        cm_i: 0,
        cm_neap: 1,
        cm_III: 2,
        cm_iv: 3,
        cm_IV: 4,
        cm_v: 5,
        cm_V: 6,
        cm_V7: 7,
        cm_VI: 8,
        cm_VII: 9,

        minmaj_shift: 100,

        //major:
        c_I: 100,
        c_ii: 101,
        c_bIII: 102,
        c_iii: 103,
        c_IV: 104,
        c_V: 105,
        c_V7: 106,
        c_bVI: 107,
        c_vi: 108,
        c_bVII: 109,

        num_min_chords: 10,
        num_maj_chords: 10,

        init: function () {
            this.major_chords = [this.c_I, this.c_IV, this.c_V, this.c_vi, this.c_iii, this.c_V7, this.c_bIII, this.c_bVI, this.c_bVII, this.c_ii];
            this.minor_chords = [this.cm_i, this.cm_iv, this.cm_V, this.cm_IV, this.cm_VI, this.cm_III, this.cm_VII, this.cm_V7, this.cm_v, this.cm_neap];

            this.major_chords_names = ["I", "ii", "bIII", "iii", "IV", "V", "V7", "bVI", "vi", "bVII"];
            this.minor_chords_names = ["i", "IIb", "III", "iv", "IV", "v", "V", "V7", "VI", "VII"];
        },

        chordName: function (chord) {
            if (chord >= this.minmaj_shift)
                return this.major_chords_names[chord - this.minmaj_shift];
            else
                return this.minor_chords_names[chord];
        },

        randomChord: function (level, step) {
            var major = true;

            if (level % 2 === 0)
                major = false;

            if (step === 0)
                if (major)
                    return this.c_I;
                else
                    return this.cm_i;

            if (major)
                return this.major_chords[RandomUtil.getMod((level >> 1) + 3)];
            else
                return this.minor_chords[RandomUtil.getMod((level >> 1) + 3)];
        },

        createChord: function (i_tone0, chord_type, i_root) {
            switch (chord_type) {
                case this.cm_i:
                    return new Chord(i_tone0, i_root, ChordType.min);
                case this.cm_neap:
                    return new Chord(i_tone0, i_root + Constants.min2, ChordType.maj);
                case this.cm_III:
                    return new Chord(i_tone0, i_root + Constants.min3, ChordType.maj);
                case this.cm_iv:
                    return new Chord(i_tone0, i_root + Constants.per4, ChordType.min);
                case this.cm_IV:
                    return new Chord(i_tone0, i_root + Constants.per4, ChordType.maj);
                case this.cm_v:
                    return new Chord(i_tone0, i_root + Constants.per5, ChordType.min);
                case this.cm_V:
                    return new Chord(i_tone0, i_root + Constants.per5, ChordType.maj);
                case this.cm_V7:
                    return new Chord(i_tone0, i_root + Constants.per5, ChordType.dom7);
                case this.cm_VI:
                    return new Chord(i_tone0, i_root + Constants.min6, ChordType.maj);
                case this.cm_VII:
                    return new Chord(i_tone0, i_root + Constants.min7, ChordType.maj);

                case this.c_I:
                    return new Chord(i_tone0, i_root, ChordType.maj);
                case this.c_ii:
                    return new Chord(i_tone0, i_root + Constants.maj2, ChordType.min);
                case this.c_iii:
                    return new Chord(i_tone0, i_root + Constants.maj3, ChordType.min);
                case this.c_bIII:
                    return new Chord(i_tone0, i_root + Constants.min3, ChordType.maj);
                case this.c_IV:
                    return new Chord(i_tone0, i_root + Constants.per4, ChordType.maj);
                case this.c_V:
                    return new Chord(i_tone0, i_root + Constants.per5, ChordType.maj);
                case this.c_V7:
                    return new Chord(i_tone0, i_root + Constants.per5, ChordType.dom7);
                case this.c_bVI:
                    return new Chord(i_tone0, i_root + Constants.min6, ChordType.maj);
                case this.c_vi:
                    return new Chord(i_tone0, i_root + Constants.maj6, ChordType.min);
                case this.c_bVII:
                    return new Chord(i_tone0, i_root + Constants.min7, ChordType.maj);

                default:
                    return new Chord(i_tone0, i_root, ChordType.maj);
            }
        }
    };
});
