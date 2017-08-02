function Sequence()
{
  this.sequence = new Array();
  this.from = 0;
}

Sequence.prototype =  
{

  Randomize : function(level, root, len)
  {
    this.from = RandomUtil.getMod(Constants.num_octaves - 1) * 12 + 
                (root + Constants.steps_by_levels[level][RandomUtil.getMod(Constants.steps_by_levels[level].length)])%12;
    //Alert.show(Constants.toneName(from));
    var available = new Array();

    for (var i = 0; i <= 12; ++i)
      for (var j = 0; j < Constants.steps_by_levels[level].length; ++j)
        if((this.from + i + 12 - root) % 12 == Constants.steps_by_levels[level][j])
        {
          available.push(this.from + i);
          break;
        }


    this.sequence = new Array(len);
    for (var ii = 0; ii < this.sequence.length; ++ii)
    {
      var step = available[RandomUtil.getMod(available.length)];
      var maxrepeats = 2;

      if (this.sequence.length > 5)
        maxrepeats = 3;

      var count = maxrepeats;
      while (count > maxrepeats - 1)
      {
        count = 0;
        step = available[RandomUtil.getMod(available.length)];
        for (var t = 0; t < ii; ++t)
          if (this.sequence[t] == step)
            ++count;
      }
      this.sequence[ii] = step;
    }
  },


  root: function()
  {
    return this.sequence[0];
  },

  add: function(tone)
  {
    this.sequence.push(tone);
  },

  ith: function(i)
  {
    return this.sequence[i];
  },

  set_ith: function(i, val)
  {
    this.sequence[i] = val;
  },

  len : function()
  {
    return this.sequence.length;
  },

  play : function()
  {
    if (SequencePlayer.playing)
      return;
    SequencePlayer.playSequence(this.sequence);
  }
}
