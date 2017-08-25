/**
 * Created by Iwan on 23.08.2017.
 */

define("ChordType", function () {

    return {
        maj: 0,
        min: 1,
        dom7: 2,
        sus: 3,
        maj7: 4,
        min7: 5,
        aug: 6,
        dim: 7,
        hdim7: 8,
        dim7: 9,
        minmaj7: 10,
        augmaj7: 11,
        aug7: 12,
        num_chords: 13,

        // TODO refactor to map style
        Name: function (i_type) {

            switch (i_type) {
                case ChordType.maj:
                    return "Major";

                case ChordType.min:
                    return "Minor";

                case ChordType.dim:
                    return "Diminished";

                case ChordType.aug:
                    return "Augmented";

                case ChordType.sus:
                    return "Suspended";

                case ChordType.dom7:
                    return "Dominant 7th";

                case ChordType.maj7:
                    return "Major 7th";

                case ChordType.min7:
                    return "Minor 7th";

                case ChordType.hdim7:
                    return "Half-dim. 7th";

                case ChordType.dim7:
                    return "Diminished 7th";

                case ChordType.minmaj7:
                    return "Minor-major 7th";

                case ChordType.augmaj7:
                    return "Aug. major 7th";

                case ChordType.aug7:
                    return "Augmented 7th";

                default:
                    return "?";
            }
        },

        ShortName: function (i_type) {

            switch (i_type) {
                case ChordType.maj:
                    return "Maj";

                case ChordType.min:
                    return "Min";

                case ChordType.dim:
                    return "Dim";

                case ChordType.aug:
                    return "Aug";

                case ChordType.sus:
                    return "Sus";

                case ChordType.dom7:
                    return "Dom 7";

                case ChordType.maj7:
                    return "Maj 7";

                case ChordType.min7:
                    return "Min 7";

                case ChordType.hdim7:
                    return "H-dim 7";

                case ChordType.dim7:
                    return "Dim 7";

                case ChordType.minmaj7:
                    return "Min-maj 7";

                case ChordType.augmaj7:
                    return "Aug maj 7";

                case ChordType.aug7:
                    return "Aug 7";

                default:
                    return "?";
            }
        }
    };
});
