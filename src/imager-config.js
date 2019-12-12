const defaultPluginsConfig = {
  Rotate: {
    controlsCss: {
      width: '15px',
      height: '15px',
      background: 'white',
      border: '1px solid black'
    },
    controlsTouchCss: {
      width: '25px',
      height: '25px',
      background: 'white',
      border: '2px solid black'
    }
  },
  Resize: {
    controlsCss: {
      width: '15px',
      height: '15px',
      background: 'white',
      border: '1px solid black'
    },
    controlsTouchCss: {
      width: '25px',
      height: '25px',
      background: 'white',
      border: '2px solid black'
    }
  },
  Crop: {
    controlsCss: {
      width: '15px',
      height: '15px',
      background: 'white',
      border: '1px solid black'
    },
    controlsTouchCss: {
      width: '25px',
      height: '25px',
      background: 'white',
      border: '2px solid black'
    }
  },
  Toolbar: {
    toolbarSize: 85,
    toolbarSizeTouch: 43,
    tooltipEnabled: true,
    tooltipCss: {
      color: 'white',
      background: 'black',
      top: '40px'
    }
  },
  Delete: {
    fullRemove: false
  },

};

const defaultOptions = {
  plugins: ['Rotate', 'Crop', 'Resize', 'Save', 'Toolbar', 'Delete', 'Undo'],
  editModeCss: {
    border: '1px dashed green',
  },
  pluginsConfig: defaultPluginsConfig,
  quality: {
    sizes: [{
        label: 'Original',
        scale: 1,
        quality: 1,
        percentage: 100
      },
      {
        label: 'Large',
        scale: 0.5,
        quality: 0.5,
        percentage: 50
      },
      {
        label: 'Medium',
        scale: 0.2,
        quality: 0.2,
        percentage: 20
      },
      {
        label: 'Small',
        scale: 0.05,
        quality: 0.05,
        percentage: 5
      }
    ],
    allowCustomSetting: true
  },
};

const CreateOptions = ({ options, pluginsConfig }, useDefault = true) => {
  const newOptions = { ...(options || {}), ...(useDefault ? defaultOptions : {} ) }
  const newPluginsConfig = { ...(pluginsConfig || {}), ...(useDefault ? defaultPluginsConfig : {}) }
  newOptions.pluginsConfig = newPluginsConfig

  return newOptions
}


export {
  defaultOptions,
  CreateOptions
}