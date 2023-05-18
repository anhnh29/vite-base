import { Button, Result } from 'antd'
import { FC, useCallback } from 'react'
import router from 'routes'

const NotFound: FC = () => {
  const goBack = useCallback(() => {
    void router.navigate('/')
  }, [])

  return (
    <Result
      status="404"
      title="Not Found"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={goBack}>
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
