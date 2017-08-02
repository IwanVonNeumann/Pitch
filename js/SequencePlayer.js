
function sequencePlaySound(tone)
  {
    SoundManager.playSound(tone);
  }
  
var SequencePlayer = 
{
  playing : false,
  sequence: null,


  
  playSequence: function(sequence) 
  {
    if(this.playing)
      return;
      
    this.sequence = sequence.slice();
    
    this.playing = true;
    
    //sequencePlaySound(sequence[0]);

    var seq = sequence.slice();
    var func= function() { if(seq.length == 0) return; sequencePlaySound(seq[0]); seq = seq.slice(1, seq.length);}
    
    for(var i = 0; i < this.sequence.length; ++i)
    {
      //var tone = this.sequence[i];
      setTimeout(func, i*611);
    }
      
    setTimeout(function(){SequencePlayer.playing = false;}, sequence.length*611);
  }
}

