var Constants = {
       phi : 1.61803398874989,
       scr_w : 480,
       scr_h : 320,
    
       key_w0 : 3,
       key_h0 : 12,
       key_w1 : 2,
       key_dw : 1,
       key_h1 : 9,
       key_scale : 5,
    
       keys_h : 150,
    
       key_state_disabled : 0,
       key_state_active : 1,
       key_state_pressed : 2,
       key_state_active_pressed : 3,
    
    
       num_octaves : 3,
       num_tones_in_octave : 12,
    
       tone_c : 0, 
       color_c:  0xff00FFFF,
    
       tone_c_sharp : 1,
       color_c_sharp:  0xffFF0080,
    
       tone_d : 2,
       color_d:  0xff00FF00,
    
       tone_e_flat : 3,
       color_e_flat:  0xff8000FF,
    
       tone_e : 4,
       color_e:  0xffFFFF00,
    
       tone_f : 5,
       color_f: 0xff0080FF,
    
       tone_f_sharp : 6,
       color_f_sharp:  0xffFF0000,
    
       tone_g : 7,
       color_g:  0xff00FF80,
    
       tone_a_flat : 8,
       color_a_flat: 0xffFF00FF,
    
       tone_a : 9,
       color_a:  0xff80FF00,
    
       tone_b_flat : 10,
       color_b_flat:  0xff0000FF,
    
       tone_b : 11,
       color_b:  0xffFF8000,
    
       num_levels : 15,
    
       uni : 0,
       min2 : 1,
       maj2  : 2,
       min3  : 3,
       maj3  : 4,
       per4  : 5,
       aug4  : 6,
       per5  : 7,
       min6 : 8,
       maj6  : 9,
       min7  : 10,
       maj7  : 11,
       per8  : 12,
       min9  : 13,
       maj9  : 14,
       min10 : 15,
       maj10  : 16,

       init: function()
       {
        var canvas = document.getElementById("canvas");
        if(canvas !== null)
        {
          this.scr_w = canvas.clientWidth;
          this.scr_h = canvas.clientHeight;
        }

        this.tone_widths = [this.key_w0 + this.key_w1, this.key_w0 + this.key_w1, this.key_w0 + this.key_w1, this.key_w0 + this.key_w1, this.key_w0 + this.key_w1 + 0.5, this.key_w0 + this.key_w1 + 0.5, this.key_w0 + this.key_w1];
        this.white_tones = [this.tone_c, this.tone_d, this.tone_e, this.tone_f, this.tone_g, this.tone_a, this.tone_b]; 
    
        this.tones = [this.tone_f_sharp, this.tone_e_flat, this.tone_a, this.tone_c, this.tone_c_sharp, this.tone_e, this.tone_g, this.tone_b_flat, this.tone_d, this.tone_f, this.tone_b, this.tone_a_flat];
        this.tone_names = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];   
        this.intervals = [this.per8, this.per4, this.per5, this.maj3, this.min3, this.min2, this.maj2, this.maj6, this.min6, this.min7, this.maj7, this.aug4, this.maj9, this.min9, this.min10, this.maj10];
    
        this.steps = [this.uni, this.maj2, this.min3, this.per4, this.per5, this.min6, this.min7, this.maj3, this.maj7, this.maj6, this.aug4];
        this.interval_names = ["unison", "minor 2", "major 2", "minor 3", "major 3", "perfect 4", "tritone", "perfect 5", "minor 6", "major 6", "minor 7", "major 7", "octave", "minor 9", "major 9", "minor 10", "major 10"];
    
        this.level_names = ["Major 1,3,5",
                            "Minor 1,3,5",
                            "Major 1,3,4,5",
                            "Minor 1,3,4,5",
                            "Major 1-5",
                            "Minor 1-5",
                            "Major Pentatonic",
                            "Minor Pentatonic",
                            "Major 1-6",
                            "Minor 1-6",
                            "Blues",
                            "Major",
                            "Minor",
                            "Harmonic Minor",
                            "Melodic Minor",
                            "Minor, 1 accidental",
                            "Minor, 2 accidentals",
                            "Minor, 3 accidentals",
                            "Minor, 4 accidentals",
                            "Chromatic"];

       this.steps_by_levels = [[this.uni, this.maj3, this.per5],
                               [this.uni, this.min3, this.per5],
                               [this.uni, this.maj3, this.per4, this.per5],
                               [this.uni, this.min3, this.per4, this.per5],
                               [this.uni, this.maj2, this.maj3, this.per4, this.per5],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5],
                               [this.uni, this.maj2, this.maj3, this.per5, this.maj6],
                               [this.uni, this.min3, this.per5, this.min6, this.min7],
                               [this.uni, this.maj2, this.maj3, this.per4, this.per5, this.maj6],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.min6],
                               [this.uni, this.min3, this.per4, this.aug4, this.per5, this.min7],
                               [this.uni, this.maj2, this.maj3, this.per4, this.per5, this.maj6, this.maj7],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.min6, this.min7],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.min6, this.maj7],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.maj6, this.maj7],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.maj6, this.min7, this.maj7],
                               [this.uni, this.maj2, this.min3, this.per4, this.per5, this.min6, this.maj6, this.min7, this.maj7],
                               [this.uni, this.maj2, this.min3, this.per4, this.aug4, this.per5, this.min6, this.maj6, this.min7, this.maj7],
                               [this.uni, this.maj2, this.min3, this.maj3, this.per4, this.aug4, this.per5, this.min6, this.maj6, this.min7, this.maj7],
                               [this.uni, this.min2, this.maj2, this.min3, this.maj3, this.per4, this.aug4, this.per5, this.min6, this.maj6, this.min7, this.maj7]];
    },

    phiOrder: function(order)
    {
      var inv_phi = 1./this.phi;
      if(order == 1)
        return inv_phi;

      return inv_phi*this.phiOrder(order-1);
    },
      
    getNumMelodyLevels : function ()
    {
      return this.steps_by_levels.length;
    },
    
    isMajor : function(level)
    {
      return (level == 0 || level == 2 || level == 4 || level == 6 || level == 8 || level == 11);
    },
    
    isBlack: function(key)
    {
      var t = key % this.num_tones_in_octave;
      return(t == this.tone_c_sharp || 
             t == this.tone_e_flat  || 
             t == this.tone_f_sharp ||
             t == this.tone_a_flat  || 
             t == this.tone_b_flat);
    },
    
    generalToneName : function(tone)
    {
      return this.tone_names[tone % 12];
    },

    toneName : function(tone)
    {
      return this.generalToneName(tone);
    },

    longToneName: function(tone)
    {
      return this.generalToneName(tone) + (Math.floor(tone/12)+1).toString();
    },
    
    isWhiteTone : function(tone)
    {
      return (this.white_tones.indexOf(tone) != -1);
    },
    
    isSharpKey : function(key, major)
    {
      if (!major)
        key = (key + 3)%12;
      
      return (key == this.tone_c || key == this.tone_g || key == this.tone_d || key == this.tone_a || key == this.tone_e || key == this.tone_b || key == this.tone_f_sharp || key == this.tone_c_sharp);
    },
    
    toneNameInKey : function(tone, key, major)
    {
      if(tone < 0)
        return "";

      var corrected = tone % 12;
      if (this.isWhiteTone(corrected))
        return this.toneName(corrected);
      if (this.isSharpKey(key, major))
        return this.toneName(corrected - 1 + 12) + "#";
      //flat tonality
      return this.toneName(corrected + 1) + "b";
    }
  };
