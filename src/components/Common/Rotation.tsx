import { FC } from 'react'
// import Rotation from 'assets/Rotation.svg';

const Rotate: FC = () => {
  return (
    <div className="flex h-[100vh] bg-blue-110 text-white-50">
      <div className="m-auto w-[80%] text-center uppercase">
        {/* <Rotation className="w-full" /> */}
        <div>Please rotate the device horizontally to start</div>
      </div>
    </div>
  )
}

export default Rotate
