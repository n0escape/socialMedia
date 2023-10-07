import React from "react"
import Preloader from "../components/common/Preloader/Preloader"

export function withSuspense<WCP extends object>(WrappedComponent: React.ComponentType<WCP>) {
	return (props: WCP) => {
			return <React.Suspense fallback={<Preloader />} >
					<WrappedComponent {...props} />
			</React.Suspense>
	}
}