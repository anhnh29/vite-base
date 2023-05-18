import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
  ],
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'code',
]

interface Props {
  value?: string
  placeholder?: string
  onChange?: (e: any) => void
  className?: string
}
const QEditorInner = (
  { value, onChange, placeholder, className }: Props,
  ref?: React.Ref<ReactQuill>
): JSX.Element => {
  return (
    <ReactQuill
      ref={ref}
      className={className}
      theme="snow"
      value={value || ''}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
export const QEditor = React.forwardRef<ReactQuill, Props>(QEditorInner)
