

var threshold = -27; // dB
var headroom = 21; // dB

function e4(x, k)
{
    return 1.0 - Math.exp(-k * x);
}

function dBToLinear(db) {
    return Math.pow(10.0, 0.05 * db);
}

function shape(x) {
    var linearThreshold = dBToLinear(threshold);
    var linearHeadroom = dBToLinear(headroom);
    
    var maximum = 1.05 * linearHeadroom * linearThreshold;
    var kk = (maximum - linearThreshold);
    
    var sign = x < 0 ? -1 : +1;
    var absx = Math.abs(x);
    
    var shapedInput = absx < linearThreshold ? absx : linearThreshold + kk * e4(absx - linearThreshold, 1.0 / kk);
    shapedInput *= sign;
    
    return shapedInput;
}

function generateColortouchCurve(curve) {
    var n = 65536;
    var n2 = n / 2;
    
    for (var i = 0; i < n2; ++i) {
        x = i / n2;
        x = shape(x);
        
        curve[n2 + i] = x;
        curve[n2 - i - 1] = -x;
    }
    
    return curve;
}

function generateMirrorCurve(curve) {
    var n = 65536;
    var n2 = n / 2;
    x = i / n2
    for (var i = 0; i < n2; ++i) {
        x = i / n2;
        x = shape(x);
        
        curve[n2 + i] = x;
        curve[n2 - i - 1] = x;
    }
    
    return curve;
}

class WaveShaper {
    constructor(context) {
        this.context = context;
        var waveshaper = context.createWaveShaper();
        var preGain = context.createGain();
        var postGain = context.createGain();
        preGain.connect(waveshaper);
        waveshaper.connect(postGain);
        this.input = preGain;
        this.output = postGain;

        var curve = new Float32Array(65536); // FIXME: share across instances
        generateColortouchCurve(curve);
        waveshaper.curve = curve;
    }
    setDrive(drive) {
        if (drive < 0.01)
            drive = 0.01;
        this.input.gain.value = drive;
        var postDrive = Math.pow(1 / drive, 0.6);
        this.output.gain.value = postDrive;
    }
}


