import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const params = [
  { "id": 1, "name": "Назначение" },
  { "id": 2, "name": "Длина" }
]

const model = {
  "paramValues": [
    { "paramId": 1, "value": "повседневное" },
    { "paramId": 2, "value": "макси" }
  ]
}

interface Color {
  color: string
}
interface Param {
  id: number
  name: string
  type?: 'string'
}
interface ParamValue {
  paramId: number
  value: string
}
interface Model {
  paramValues: ParamValue[]
  colors?: Color[]
}
interface Props {
  params: Param[]
  model: Model
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues)

  const handleParamValueChange = (paramId: number, value: string) => {
    setParamValues(paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { ...paramValue, value }
      }
      return paramValue;
    }))
  }

  const getModel = (): Model => ({
    paramValues,
    colors: model.colors
  })

  return (
    <>
      {params.map((param) => (
        <div key={param.id}>
          <label>{param.name}</label>
          <input
            type='text'
            value={paramValues.find((paramValue) => paramValue.paramId === param.id)?.value || ''}
            onChange={(e) => handleParamValueChange(param.id, e.target.value)}
          />
        </div>
      ))}
      <button onClick={() => console.log(getModel())}>Get Model</button>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>,
  document.getElementById('root')
)
