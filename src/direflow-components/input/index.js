import { DireflowComponent } from 'direflow-component';
import App from './App';

export default DireflowComponent.create({
  component: App,
  configuration: {
    tagname: 'wc-input',
  },
  plugins: [
    {
      name: 'font-loader',
      options: {
        google: {
          families: ['Advent Pro', 'Noto Sans JP'],
        },
      },
    },
    // {
    //   name: 'external-loader',
    //   options: {
    //     paths: [
    //       {
    //         src: 'https://www.ovo.id/cdn/common-style-guides.css',
    //         async: true
    //       }
    //     ]
    //   }
    // }
  ],
});
