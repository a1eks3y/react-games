import React, {useEffect, useState} from 'react';
import './App.css'
import SnakeCell from "./SnakeCell/SnakeCell";

const App = () => { //37x23 [[1, 2] [3, 1]
    const [score, setScore] = useState(0)
    const [GameOver, setGameOver] = useState(false)
    const [pause, setPause] = useState(true)
    const [snake, setSnake] = useState(JSON.stringify([[1, 12], [2, 12], [3, 12]])) //[x,y]
    const [apple, setApple] = useState(JSON.stringify([Math.floor(Math.random() * 33 + 4), Math.floor(Math.random() * 22 + 1)]))
    const [mainDirection, setMainDirection] = useState('Right')
    let direction = mainDirection
    const changeDirection = (e) => {
        let snakeArr = JSON.parse(snake)
        // eslint-disable-next-line default-case
        switch (e.code) {
            case 'KeyW' || 'ArrowUp':
                if (snakeArr[snakeArr.length - 1][1] <= snakeArr[snakeArr.length - 2][1]) direction = 'Up'
                break;
            case 'KeyA' || 'ArrowLeft':
                if (snakeArr[snakeArr.length - 1][0] <= snakeArr[snakeArr.length - 2][0]) direction = 'Left'
                break;
            case 'KeyD' || 'ArrowRight':
                if (snakeArr[snakeArr.length - 2][0] <= snakeArr[snakeArr.length - 1][0]) direction = 'Right'
                break;
            case 'KeyS' || 'ArrowDown':
                if (snakeArr[snakeArr.length - 2][1] <= snakeArr[snakeArr.length - 1][1]) direction = 'Down'
                break;
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        !pause && !GameOver && document.addEventListener('keydown', changeDirection)
        !pause && !GameOver && await new Promise(() => setTimeout(() => {
            let directNow = direction || mainDirection
            let snakeArr = JSON.parse(snake)
            let lastElem = snakeArr[snakeArr.length - 1]
            // eslint-disable-next-line default-case
            switch (directNow) {
                case 'Up':
                    snakeArr.push([lastElem[0], lastElem[1] - 1])
                    break
                case 'Left':
                    snakeArr.push([lastElem[0] - 1, lastElem[1]])
                    break
                case 'Right':
                    snakeArr.push([lastElem[0] + 1, lastElem[1]])
                    break
                case 'Down':
                    snakeArr.push([lastElem[0], lastElem[1] + 1])
                    break
            }
            let appleAte = false
            let crash = false
            snakeArr.forEach((el, i, arr) => {
                if (el[0] === JSON.parse(apple)[0] && el[1] === JSON.parse(apple)[1]) appleAte = true
                if (el[0] === arr[arr.length - 1][0] && el[1] === arr[arr.length - 1][1] && i !== arr.length - 1)
                    crash = true
            })
            debugger
            if (snakeArr[snakeArr.length - 1][0] < 1
                || snakeArr[snakeArr.length - 1][1] < 1
                || snakeArr[snakeArr.length - 1][0] > 37
                || snakeArr[snakeArr.length - 1][1] > 23)
                crash = true
            !appleAte && snakeArr.shift()
            appleAte && setScore(score + 1)
            if (crash) {
                setGameOver(true)
                setPause(true)
            }
            appleAte && setApple(window.apple || JSON.stringify([Math.floor(Math.random() * 36 + 1), Math.floor(Math.random() * 22 + 1)]))
            snakeArr = JSON.stringify(snakeArr)
            setMainDirection(direction)
            setSnake(snakeArr)
            document.removeEventListener('keydown', changeDirection)
        }, window.timedelay || 120/(0.01 * score**1.5 + 1)))
    }, [snake, pause, GameOver]) // eslint-disable-line


    return (
        <>
            <div className='App' style={{cursor: (GameOver || pause) && 'pointer'}} onClick={() => {
                if (GameOver) {
                    setMainDirection('Right')
                    setGameOver(false)
                    setScore(window.score || 0)
                    setSnake(window.snake || JSON.stringify([[1, 12], [2, 12], [3, 12]]))
                    setApple(window.apple || JSON.stringify([Math.floor(Math.random() * 33 + 4), Math.floor(Math.random() * 22 + 1)]))
                } else {
                    pause && setPause(false)
                }

            }}>
                {
                    pause && !GameOver
                        ?
                        <div style={{height: '100%', color: 'white'}}>Кликните, чтобы начать</div>
                        :
                        GameOver ? <div className='GameOver' style={{
                                alignContent: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                fontSize: '195px',
                                color: 'rgb(152,0,2)'
                            }}>GameOver</div>
                            :
                            <>
                                {JSON.parse(snake).map(el =>
                                    <SnakeCell key={el} x={el[0]} y={el[1]}/>
                                )}
                                <div className='apple' style={{
                                    marginTop: (JSON.parse(apple)[1] - 1) * 20 + 'px',
                                    marginLeft: (JSON.parse(apple)[0] - 1) * 20 + 'px'
                                }}>
                                    <div className='bg-apple'/>
                                </div>
                            </>
                }

            </div>
            <div style={{position: 'absolute', fontSize: '40px', right: 40, top: 'calc(100vh / 2)'}}>
                {score}
            </div>
        </>
    )
};

export default App;