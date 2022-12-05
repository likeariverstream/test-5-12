import React, { ChangeEventHandler, FormEventHandler, FC } from 'react';

export const ParamEditor: FC = () => {

  const params = [{ id: 1, name: 'Назначение' }, { id: 2, name: 'Длина' }]
  const model = [{ id: 1, value: '' }]
  const [objArr, setValue] = React.useState<Array<{ [key: string]: any }>>([model]);
  const [obj, setObj] = React.useState<{ [key: string]: any }>(model);
  const [data, setData] = React.useState(false);
  const [save, setSave] = React.useState(false);
  const [input, setInput] = React.useState(false)

  const change: ChangeEventHandler<HTMLInputElement> = (e) => {
    setObj({ id: Number(e.target.id), value: e.target.value });
  }

  const handleEnter: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setValue([...objArr, obj])
    setSave(true)
    setData(false)
  }


  const editModel = () => {
    setData(true);
    setSave(false)
    setInput(false)
  }

  const getModel = () => {
    setInput(true)
  }


  return (
    <div style={{
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {input && <>
        {objArr.map((item, index) => {
          if (index !== 0)
            return <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: 5
            }}><p>{`id: ${item.id}`}</p><p>{`value: ${item.value}`}</p></div>
        })}
        <button onClick={editModel}>Редактировать данные</button>
      </>}
      {!input && save && <button onClick={getModel}>Получить данные</button>}
      {input && <>{objArr.map((item) => {
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: 5
        }}>
          <p>{item.id}</p><p>{item.value}</p>
        </div>
      })}</>}
      {!data && !save && <button onClick={editModel}>Редактировать данные</button>}
      {data && <form style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'space-between'
      }} onSubmit={handleEnter}>
        {params.map((item, index) => {

          return <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: 5
          }} key={item.id}>
            <p >{item.name}</p>
            <input onChange={e => change(e)} id={`${item.id}`}></input>
          </div>
        })}
        <div>
          <button>Сохранить</button>
        </div>
      </form>}
    </div>
  )
}
