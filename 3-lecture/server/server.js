const express = require('express')
const app = express()
const port = 5000
const path = require('path')


const header = {
    setHeaders: (res, path) => {
        // res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
        // res.setHeader('Expires', '-1')
        // res.setHeader('Pragma', 'no-cache')
        
        // 모든 리소스에 같은 캐시 설정
        // res.setHeader('Cache-Control', 'max-age: 20')

        if(path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        } else if(path.endsWith('.js') || path.endsWith('.css') || path.endsWith('.webp')) {
            // 이미지의 경우 webp 외에 다른 이미지를 사용하지만, 우선적으로 webp 만 처리
            res.setHeader('Cache-Control', 'public, max-age:31536000');
        } else {
            res.setHeader('Cache-Control', 'no-store'); // 'no-cache' 권장
        }
    },
}

app.use(express.static(path.join(__dirname, '../build'), header))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
