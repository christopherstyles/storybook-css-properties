import React, { CSSProperties, useEffect, useState } from "react";
import { ColorControl, TextControl } from "@storybook/components";
import { IItem } from "../get-all-css-variables";
import { useDebounce } from "../use-debounce";

interface PanelContentProps {
  cssProperties: IItem[],
}

export const PanelContent: React.FC<PanelContentProps> = ({
  cssProperties
}) => {
  console.log('vars in the panelcontent ', cssProperties)
  const properties = [...cssProperties]
  const [key, setKey] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 100)

  const changeHanlder = (value: string, key: string) => {
    properties.map(obj => {
      if (obj.key === key) {
        obj.value = value
      }

      return obj;
    })

    setValue(value)
    setKey(key)
  }

  const getRoot = () => {
    const iframe = document.querySelector('iframe#storybook-preview-iframe') as HTMLIFrameElement
    const root = iframe.contentWindow.document.querySelector('#root') as HTMLDivElement
    return root
  }

  useEffect(() => {
    if (value === '') return

    const root = getRoot()
    root.style.setProperty(key, value)

    changeHanlder('', '')
  }, [debouncedValue])

  const inputComponenet = (obj: IItem) => {
    if (obj.type === 'color') {
      return (
        <ColorControl
          value={obj.value}
          name={obj.name}
          onChange={(value) => changeHanlder(value, obj.key)}
        />
      )
    }

    return (
      <TextControl
        name={obj.name}
        onChange={(value) => changeHanlder(value, obj.key)}
        value={obj.value}
      />
    )
  }

  return (
    <div style={styles.wrapper}>
      {properties.map((obj) =>
        <div key={obj.name} style={styles.line}>
          <div style={styles.title}>
            {obj.key}
          </div>
          {inputComponenet(obj)}
        </div>
      )}
    </div>
  )
};

const styles: Record<string, CSSProperties> = {
  wrapper: {
    padding: '1rem'
  },
  line: {
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  title: {
    marginRight: '1rem',
    textAlign: 'right',
    minWidth: '200px',
    fontWeight: 'bold',
  },
}
