const stream$ = interval(1000)
  .pipe(
    tap(v => console.log('Tap: ', v)), // для отладки число итераций
    take(5),
    map(v => v * 3),
    filter(v => v % 2 === 0),
    take(10),
    takeLast(5)
    takeWhile(v => v < 7) // выводит при выполнении условия
    scan((acc, v) => acc + v, 0),
    reduce((acc, v) => acc + v, 0) // сработает при завершении потока
  )

stream$.subscribe({
  next: v => console.log('Next: ', v),
  complete: () => console.log('Complete')
})

fromEvent(document, 'click')
  .pipe(
    switchMap(event => { // позволяет поменять направление стрима с одного на другой
      return interval(1000)
        .pipe(
          tap(v => console.log('Tap: ', v)),
          take(5),
          reduce((acc, v) => acc + v, 0)
        )
    })
  )
  .subscribe({
    next: v => console.log('Next: ', v),
    complete: () => console.log('Complete')
  })