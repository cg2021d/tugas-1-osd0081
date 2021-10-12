var canvas = document.getElementById('my_Canvas');

function main() {
    gl = canvas.getContext('webgl'); 
    // var programInfo = webglUtils.createProgramInfo();
    // left();
    
    let top = 0.397276812777000;
    let bot = -0.315626122322000;
    let speed = 0.0054;
    var dy = 0;
    
    requestAnimationFrame(draw);

    function draw() {
        if(top>1.01 && speed >0){
            speed *=-1;
        }else if (bot<-1.0 && speed < 0){
            speed *=-1;
        }
        dy += speed;
        top += speed;
        bot +=speed;
        gl.clearColor(1.0, 0.8, 0.2, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.viewport(0,0,canvas.width,canvas.height);
        right(dy);
        left();
        requestAnimationFrame(draw);
    }
}

function right(dy) {  
    var vertices = [
                    0.500000000000000, 0.273702387603100, 0.0 /*pusat atas*/
                    ,0.375941313287600, 0.328401599353000, 0.0 
                    ,0.391377904083700, 0.348915139816700, 0.0 
                    ,0.414086105609800, 0.369361696309500, 0.0 
                    ,0.440549156581300, 0.384640145911500, 0.0 
                    ,0.469610494687100, 0.394082747060900, 0.0 
                    ,0.500000000000000, 0.397276812777000, 0.0 
                    ,0.530389505312900, 0.394082747060900, 0.0 
                    ,0.559450843418700, 0.384640145911500, 0.0 
                    ,0.585913894390220, 0.369361696309500, 0.0 
                    ,0.608622295916300, 0.348915139816700, 0.0 
                    ,0.624058686712400, 0.328401599353000, 0.0 
                    ,0.636321422338400, 0.237251349417500, 0.0 
                    ,0.625763873251400, 0.229705075060400, 0.0 
                    ,0.609709841421300, 0.184955790354500, 0.0 
                    ,0.588860963074900, 0.164085157801900, 0.0 
                    ,0.574421585974220, 0.153812290560100, 0.0 /*atas kanan*/
                    ,0.425578414025800, 0.153812290560100, 0.0 /*atas kiri*/
                    ,0.411139036925100, 0.164085157801900, 0.0 
                    ,0.390290158578700, 0.184955790354500, 0.0 
                    ,0.374236126748600, 0.229705075060400, 0.0 
                    ,0.363678579661600, 0.237251349417500, 0.0 
                    ,0.500000000000000, -0.100000000000000, 0.0 /*pusat bawah*/
                    ,0.586281022042300, -0.00905884904270000, 0.0 /*bawah kanan*/
                    ,0.604819746292700, -0.0156695622288000, 0.0 
                    ,0.630305809939900, -0.0301762752765000, 0.0 
                    ,0.652218826706400, -0.0496648324434000, 0.0 
                    ,0.669601092609220, -0.0732834902449000, 0.0 
                    ,0.681692919219100, -0.100000000000000, 0.0 
                    ,0.697464225303300, -0.217229855530100, 0.0 
                    ,0.665980002143000, -0.255429383117600, 0.0 
                    ,0.627241656428700, -0.286248221305100, 0.0 
                    ,0.582942239755220, -0.308339438978700, 0.0 
                    ,0.559951235046220, -0.315626122322000, 0.0 
                    ,0.440048764953800, -0.315626122322000, 0.0 
                    ,0.417057760244800, -0.308339438978700, 0.0 
                    ,0.372758343571300, -0.286248221305100, 0.0 
                    ,0.334019997857000, -0.255429383117600, 0.0 
                    ,0.302535774696700, -0.217229855530100, 0.0 
                    ,0.318307080780900, -0.100000000000000, 0.0 
                    ,0.330398907390800, -0.0732834902449000, 0.0 
                    ,0.347781173293600, -0.0496648324434000, 0.0 
                    ,0.369694190060100, -0.0301762752765000, 0.0 
                    ,0.395180253707300, -0.0156695622288000, 0.0 
                    ,0.413718979957700, -0.00905884904270000, 0.0
    ]; /*bawah kiri*/              

    var indices = [
        0,1,2
        ,0,2,3
        ,0,3,4
        ,0,4,8
        // ,0,5,6
        // ,0,6,7
        // ,0,7,8
        ,0,8,9
        ,0,9,10
        ,0,10,11
        ,0,11,12
        // ,0,12,13
        ,0,12,14
        ,0,14,15
        ,0,15,16
        ,0,16,17
        ,0,17,18
        ,0,18,19
        ,0,19,21
        // ,0,20,21
        ,0,21,1
        ,17,23,16
        ,17,44,23
        ,22,23,24
        ,22,24,25
        ,22,25,26
        ,22,26,27
        ,22,27,28
        ,22,28,29
        ,22,29,30
        ,22,30,31
        ,22,31,32
        ,22,32,33
        ,22,33,34
        ,22,34,35
        ,22,35,36
        ,22,36,37
        ,22,37,38
        ,22,38,39
        ,22,39,40
        ,22,40,41
        ,22,41,42
        ,22,42,43
        ,22,43,44
        ,22,44,23
    ];

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    var vertCode =
                'uniform float dx;'+
                'uniform float dy;'+
                'uniform float dz;'+
                'attribute vec3 coordinates;' +
                'void main(void) {' +
                ' mat4 translasi = mat4(1.0, 0.0, 0.0, 0.0,0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, dx, dy, dz, 1.0);'+
                ' gl_Position = translasi * vec4(coordinates, 1.0);' +
                '}';

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' +
    '}';

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); 
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, 
        gl.FLOAT, 
        false, 
        3*Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.enableVertexAttribArray(coord);

    // let top = 0.397276812777000;
    // let bot = -0.315626122322000;
    // let speed = 0.0054;

    var dx = 0;
    // var dy = 0;
    var dz = 0;
    var uDx = gl.getUniformLocation(shaderProgram, 'dx');
    var uDy = gl.getUniformLocation(shaderProgram, 'dy');
    var uDz = gl.getUniformLocation(shaderProgram, 'dz');

    // function render(){
    //     if(top>1.0 && speed >0){
    //         speed *=-1;
    //     }else if (bot<-1.0 && speed < 0){
    //         speed *=-1;
    //     }
    //     dy += speed;
    //     top += speed;
    //     bot +=speed;
        
        gl.uniform1f(uDx, dx);
        gl.uniform1f(uDy, dy);
        gl.uniform1f(uDz, dz);
        
        gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
    //     requestAnimationFrame(render);
    // }
    // requestAnimationFrame(render);
    // gl.drawElements( gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
}

function left() {
    var vertices =[
        -0.776685037100000, 0.00000000000000, 0.0 //pusat kiri
        ,-0.871705245200000, 0.00000000000000, 0.0
        ,-0.865767833700000, 0.0564906969000000, 0.0
        ,-0.848215092500000, 0.110512479300000, 0.0
        ,-0.825843698900000, 0.151057485400000, 0.0
        ,-0.819814160800000, 0.159704336100000, 0.0
        ,-0.709732107900000, 0.160577357400000, 0.0
        ,-0.705642416000000, 0.151057485400000, 0.0
        ,-0.684227542200000, 0.0820823755000000, 0.0
        ,-0.675600336900000, 0.0748417188000000, 0.0
        ,-0.675600336900000, -0.0748417188000000, 0.0
        ,-0.684227542200000, -0.0820823755000000, 0.0
        ,-0.705642416000000, -0.151057485400000, 0.0
        ,-0.709732107900000, -0.160577357400000, 0.0
        ,-0.819814160800000, -0.159704336100000, 0.0
        ,-0.825843698900000, -0.151057485400000, 0.0
        ,-0.848215092500000, -0.110512479300000, 0.0
        ,-0.865767833700000, -0.0564906969000000, 0.0
        ,-0.208346925000000, 0.00000000000000, 0.0 //pusat kanan
        ,-0.309431625200000, 0.0748417188000000, 0.0
        ,-0.300804419900000, 0.0820823755000000, 0.0
        ,-0.279389546100000, 0.151057485400000, 0.0
        ,-0.275299854200000, 0.160577357400000, 0.0
        ,-0.165217801300000, 0.159704336100000, 0.0
        ,-0.159188263200000, 0.151057485400000, 0.0
        ,-0.136816869600000, 0.110512479300000, 0.0
        ,-0.119264128400000, 0.0564906969000000, 0.0
        ,-0.113326716900000, 0.00000000000000, 0.0
        ,-0.119264128400000, -0.0564906969000000, 0.0
        ,-0.136816869600000, -0.110512479300000, 0.0
        ,-0.159188263200000, -0.151057485400000, 0.0
        ,-0.165217801300000, -0.159704336100000, 0.0
        ,-0.275299854200000, -0.160577357400000, 0.0
        ,-0.279389546100000, -0.151057485400000, 0.0
        ,-0.300804419900000, -0.0820823755000000, 0.0
        ,-0.309431625200000, -0.0748417188000000, 0.0
    ]

    var indices = [
        0,1,2
        ,0,2,3
        ,0,3,4
        ,0,4,5
        ,0,5,6
        ,0,6,7
        ,0,7,8
        ,0,8,9
        ,0,9,10
        ,0,10,11
        ,0,11,12
        ,0,12,13
        ,0,13,14
        ,0,14,15
        ,0,15,16
        ,0,16,17
        ,0,17,1
        ,18,19,20
        ,18,20,21
        ,18,21,22
        ,18,22,23
        ,18,23,24
        ,18,24,25
        ,18,25,26
        ,18,26,27
        ,18,27,28
        ,18,28,29
        ,18,29,30
        ,18,30,31
        ,18,31,32
        ,18,32,33
        ,18,33,34
        ,18,34,35
        ,18,19,35
        ,19,10,9
        ,19,35,10
    ];

    var vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var Index_Buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    var vertCode =
                'attribute vec3 coordinates;' +
                'void main(void) {' +
                ' gl_Position = vec4(coordinates, 1.0);' +
                '}';

    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertShader, vertCode);
    gl.compileShader(vertShader);

    var fragCode =
    'void main(void) {' +
    ' gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);' +
    '}';

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, fragCode);
    gl.compileShader(fragShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);

    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer); 
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");
    gl.vertexAttribPointer(coord, 2, 
        gl.FLOAT, 
        false, 
        3*Float32Array.BYTES_PER_ELEMENT, 
        0);
    gl.enableVertexAttribArray(coord);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);
    
}