define("Chord", ["Config", "Constants", "RandomUtil", "ChordType","SoundManager"],
    function (Config, Constants, RandomUtil, ChordType, SoundManager) {

        var Chord = function (itone0, iroot, itype) {
            this.initInverted(itone0, iroot, itype);
        };

        function intervalPlaySound(tone) {
            SoundManager.playSound(tone);
        }

        Chord.prototype = {

            tones: null,
            type: 0,
            root: 0,

            toString: function () {
                var s = Constants.toneNameInKey(this.tones[0], this.root, false);

                for (var i = 1; i < this.tones.length; ++i) {
                    s += "-" + Constants.toneNameInKey(this.tones[i], this.root, false);
                }

                return s;
            },


            typeToString: function () {
                return ChordType.Name(this.type);
            },

            equal: function (other) {
                if (this.tones.length !== other.tones.length)
                    return false;

                for (var i = 0; i < this.tones.length; ++i) {
                    if (this.tones[i] !== this.other.tones[i])
                        return false;
                }

                return true;
            },

            randomChord: function (level) {
                var iroot = 7 + RandomUtil.getMod(2 * 12 - 7);
                var itype = RandomUtil.getMod(Math.min(level + 2, ChordType.num_chords));

                this.init(iroot, itype);
            },

            randomOfTwo: function (type0, type1) {
                var iroot = RandomUtil.getMod(12) + 12;
                var itype = (RandomUtil.getMod(2) === 0) ? type0 : type1;
                this.init(iroot, itype);
            },

            init: function (i_root, i_type) {
                this.type = i_type;
                this.root = i_root;

                switch (this.type) {
                    case ChordType.maj:
                        var majtones = [this.root, this.root + Constants.maj3, this.root + Constants.per5];
                        this.tones = majtones.slice();
                        break;

                    case ChordType.min:
                        var mintones = [this.root, this.root + Constants.min3, this.root + Constants.per5];
                        this.tones = mintones.slice();
                        break;

                    case ChordType.dim:
                        var dimtones = [this.root, this.root + Constants.min3, this.root + Constants.aug4];
                        this.tones = dimtones.slice();
                        break;

                    case ChordType.aug:
                        var augtones = [this.root, this.root + Constants.maj3, this.root + Constants.min6];
                        this.tones = augtones.slice();
                        break;

                    case ChordType.sus:
                        var sustones = [this.root, this.root + Constants.per4, this.root + Constants.per5];
                        this.tones = sustones.slice();
                        break;

                    case ChordType.dom7:
                        var dom7tones = [this.root, this.root + Constants.maj3, this.root + Constants.per5, this.root + Constants.min7];
                        this.tones = dom7tones.slice();
                        break;

                    case ChordType.maj7:
                        var maj7tones = [this.root, this.root + Constants.maj3, this.root + Constants.per5, this.root + Constants.maj7];
                        this.tones = maj7tones.slice();
                        break;

                    case ChordType.min7:
                        var min7tones = [this.root, this.root + Constants.min3, this.root + Constants.per5, this.root + Constants.min7];
                        this.tones = min7tones.slice();
                        break;

                    case ChordType.hdim7:
                        var hdim7tones = [this.root, this.root + Constants.min3, this.root + Constants.aug4, this.root + Constants.min7];
                        this.tones = hdim7tones.slice();
                        break;

                    case ChordType.dim7:
                        var dim7tones = [this.root, this.root + Constants.min3, this.root + Constants.aug4, this.root + Constants.maj6];
                        this.tones = dim7tones.slice();
                        break;

                    case ChordType.minmaj7:
                        var minmaj7tones = [this.root, this.root + Constants.min3, this.root + Constants.per5, this.root + Constants.maj7];
                        this.tones = minmaj7tones.slice();
                        break;

                    case ChordType.augmaj7:
                        var augmaj7tones = [this.root, this.root + Constants.maj3, this.root + Constants.min6, this.root + Constants.maj7];
                        this.tones = augmaj7tones.slice();
                        break;

                    case ChordType.aug7:
                        var aug7tones = [this.root, this.root + Constants.maj3, this.root + Constants.min6, this.root + Constants.min7];
                        this.tones = aug7tones.slice();
                        break;

                    default:
                        return;
                }
            },

            initInverted: function (i_tone0, i_root, i_type) {
                this.init(i_root, i_type);

                for (var i = 0; i < this.tones.length; ++i) {
                    this.tones[i] = this.tones[i] % 12;
                    while (this.tones[i] < i_tone0)
                        this.tones[i] += 12;
                }
            },

            play: function () {
                if (Config.target === Target.WEB) {
                    for (var i = 0; i < this.tones.length; ++i)
                        SoundManager.playSound(this.tones[i], 0.7);
                } else {
                    if (this.tones.length === 3)
                        SoundManager.playChord3(this.tones[0], this.tones[1], this.tones[2]);

                    if (this.tones.length === 4)
                        SoundManager.playChord4(this.tones[0], this.tones[1], this.tones[2], this.tones[3]);
                }
            }
        };

        return Chord;
    }
);
