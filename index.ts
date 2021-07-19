import * as async from 'async';
import * as fs from "fs";
import * as https from "https";

import { images } from './images';
const CONCURRENCY = 2;
//console.log(async);

type Task = {
    url: string;
}

function downloadFileFromUrl(url: string, dirTarget: string, callback: { (): void; (): void; }) {
    const fileName = url.split('/').pop()?.split('?').shift();
    
    if (fileName) {
        const writeFile = `${dirTarget}/${fileName}`;
        //console.log('downloading', writeFile);
        const pathFile = fs.createWriteStream(writeFile);
        
        https.get(url, (response) => {
            response.pipe(pathFile);
            callback();
        });
    }
    else {
        throw new Error("FILE_NOT_FOUND");        
    }
}

const q = async.queue((task: Task, callback) => {
    const dir = './downloads';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    downloadFileFromUrl(task.url, dir, () => {
        callback();
    });
}, CONCURRENCY);

q.drain(() => {
    console.log('Download completed!');
})

q.error((err, task: Task) => {
    console.error(err, task);
})


// add items to queue
// q.push({ url: 'test0' });
// q.push({ url: 'test1' }, () => { console.log('this is the callback'); });
// q.push({ url: 'test2' });
// q.push({ url: 'test3' });
// q.push({ url: 'test4' });

images.forEach(function (url: string) {
    q.push({ url });
});
function mkdirp(arg0: string, arg1: () => void) {
    throw new Error('Function not implemented.');
}

function downloadLecture(chapterindex: any, lectureindex: any, num_lectures: any, chapter_name: any) {
    throw new Error('Function not implemented.');
}

function chapterindex(chapterindex: any, lectureindex: any, num_lectures: any, chapter_name: any) {
    throw new Error('Function not implemented.');
}

function lectureindex(chapterindex: any, lectureindex: any, num_lectures: any, chapter_name: any) {
    throw new Error('Function not implemented.');
}

function num_lectures(chapterindex: any, lectureindex: any, num_lectures: any, chapter_name: any) {
    throw new Error('Function not implemented.');
}

function chapter_name(chapterindex: any, lectureindex: any, num_lectures: any, chapter_name: any) {
    throw new Error('Function not implemented.');
}

