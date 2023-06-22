import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/client/components/ui/alert'
import { Button } from '@/client/components/ui/button'
import { AlertTriangleIcon } from 'lucide-react'
import Link from 'next/link'

export default function Waiting() {
  return (
    <div className={'h-full grid content-center'}>
      <Alert>
        <AlertTriangleIcon className="h-4 w-4" />
        <AlertTitle className={'mb-2 text-sm'}>アクセスできません</AlertTitle>
        <AlertDescription>
          <p className={'text-xs'}>
            招待完了後、アプリケーションの利用が可能です
          </p>
        </AlertDescription>
      </Alert>

      <Link href={'/'}>
        <Button className={'w-full mt-4'}>トップに戻る</Button>
      </Link>
    </div>
  )
}
