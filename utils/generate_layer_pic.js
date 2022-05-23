


layers = [
    {   name: 'background', 
        operate: 'background',
        traits:  [{name:'Eggplant', color: '#704852'},
            {name:'Sea Green Creyola', color: '#2cf6b3'},
            {name:'Ebony', color: '#676f54'},
            {name:'Minion Yellow', color: '#edd83d'},
            {name:'Aqua', color: '#00FFFF'},
            {name:'Misty Rose', color: '#FFE4E1'},
            {name:'Silver', color: '#C0C0C0'},
            {name:'Azure', color: '#F0FFFF'},
        ]
    },

    {   name: 'body', 
        operate: 'category base',
        traits: [{name:'Barn Red', color: '#721e09'},
            {name:'Hunter Green', color: '#2f5625'},
            {name:'Minion Vinor Tan', color: '#aa510e'},
            {name:'Gunmetal', color: '#223944'},
            {name:'Dark Cyan', color: '#008B8B'},
            {name:'Purple', color: '#800080'},
            
        ]
    },
    
    {   name: 'hair',
        operate: 'normal',
        number: 6,
        position: [300, 0],
    },
    
    {   name: 'eyes',
        operate: 'normal',
        number: 8,
        position: [600, 0],
    },
    
    {   name: 'ears',
        operate: 'normal',
        number: 5,
        position: [0, 200],
    },

    {   name: 'nose',
        operate: 'category subfolder',
        sub_folders: [{name:'Barn Red', color: '#721e09'},
        {name:'Hunter Green', color: '#2f5625'},
        {name:'Minion Vinor Tan', color: '#aa510e'},
        {name:'Gunmetal', color: '#223944'},
        {name:'Dark Cyan', color: '#008B8B'},
        {name:'Purple', color: '#800080'},],
        number: 9,
        position: [300, 200],
    },

    {   name: 'mouth',
        operate: 'normal',
        number: 5,
        position: [600, 200],
    },
    
    {   name: 'clothes',
        operate: 'normal',
        number: 7,
        position: [0, 400],
    },
    
    {   name: 'tie',
        operate: 'normal',
        number: 5,
        position: [300, 400],
    },
    
    {   name: 'necklace',
        operate: 'normal',
        number: 8,
        position: [600, 400],
    },
]


const basePath = process.cwd();
const fs = require("fs");
const path = require('path');
const { createCanvas } = require("canvas");

layers_path = `${basePath}/layers`

console.log('img store path: %s', layers_path)

const saveImage = (path, name, canvas) => {
    fs.writeFileSync(
      `${path}/${name}.png`,
      canvas.toBuffer("image/png")
    );
};

const grid = (ctx, color='green') => {

    ctx.fillStyle = color;
    ctx.fillRect(1,1,299, 199)

    ctx.font = "36px";
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(900, 0)
    ctx.lineTo(900, 600)
    ctx.lineTo(0, 600)
    ctx.lineTo(0, 0)

    ctx.moveTo(300, 0)
    ctx.lineTo(300, 600)
    ctx.moveTo(600, 0)
    ctx.lineTo(600, 600)

    ctx.moveTo(0, 200)
    ctx.lineTo(900, 200)
    ctx.moveTo(0, 400)
    ctx.lineTo(900, 400)

    ctx.strokeStyle = color;
    ctx.stroke()
}

const writeText = (ctx, _x, _y, text='Hello', color = 'black') => {
    ctx.font = '36px serif'
    ctx.fillStyle = color; //文字字体和颜色
    ctx.fillText(text, _x+50,  _y+110);
}

const generate_pictures = (base_path, layer) => {
    // make layer directory
    fs.mkdirSync(path.join(base_path, layer.name), (err) => {
        if (err) {
            return console.error(err);
            throw err
        }
        console.log('Directory created successfully!');
    });

    if (layer.operate == 'background' | layer.operate === 'category base') {
        layer.traits.forEach(trait => {            
            let canvas = createCanvas(900, 600)
            canvas_ctx = canvas.getContext("2d");
            if (layer.operate === 'background') {
                canvas_ctx.fillStyle = trait.color;
                canvas_ctx.fillRect(0,0,900, 600) 
            } else if (layer.operate === 'category base') {
                grid(canvas_ctx, trait.color)
                writeText(canvas_ctx, 0,0, trait.name.slice(0,11) + '...', 'white')   
            }
            saveImage(path.join(layers_path, layer.name), trait.name, canvas)  
        }) 
    } else {
        if (layer.operate == 'category subfolder') {
            
            layer.sub_folders.forEach(subdir => {
                full_dir = path.join(path.join(base_path, layer.name), subdir.name)
                console.log(full_dir)
                full_dir = path.join((path.join(base_path, layer.name), subdir.name))
                // console.log(full_dir)
                fs.mkdirSync(path.join(path.join(base_path, layer.name), subdir.name), (err) => {
                    if (err) {
                        return console.error(err);
                        throw err
                    }
                    console.log('Directory created successfully!');
                });
                for (i=0; i<layer.number; i++)  {
                    let canvas = createCanvas(900, 600)
                    canvas_ctx = canvas.getContext("2d");
                    canvas_ctx.fillStyle = subdir.color;
                    canvas_ctx.fillRect(layer.position[0]+10, layer.position[1]+50, 280, 100)
                    writeText(canvas_ctx, layer.position[0],layer.position[1], layer.name + '_' + i, 'white')
                    saveImage(path.join(path.join(base_path, layer.name), subdir.name), layer.name + i, canvas)
                }
        })

        } else {
            for (i=0; i<layer.number; i++) {
                let canvas = createCanvas(900, 600)
                canvas_ctx = canvas.getContext("2d");
                writeText(canvas_ctx, layer.position[0],layer.position[1], layer.name.slice(0,11) + '_' + i, 'black')
                saveImage(path.join(layers_path, layer.name), layer.name + i, canvas) 
            }
        }
    }
  
}


const main = (notReveal) => {
    try {
        // empty the folder layers
        existing_dirs = fs.readdirSync(layers_path)
        try {
            existing_dirs.forEach(dir => {
                fs.rmSync(`${layers_path}/${dir}`, { recursive: true, force: true }, (err) => {
                    if (err) {
                        console.error(err);
                        throw err
                    }
                })
                // console.log(`Deleted:  ${layers_path}/${dir}`)
            })
        } catch (error) {
            console.error("Remove Files/Folders Error:", error);
        }
        console.log('Picture files/directories deleted')
        //return

        // generate trait pic files
        layers.forEach (layer => {
            generate_pictures(layers_path, layer)
        })
    } catch (error) {
        console.error("Main Error:", error);
    }
}

main()