import React, { Component } from 'react'
import Lightbox from 'react-images'

export default class LightboxGallery extends Component {

	componentWillMount() {
		this.state = {
			lightboxIsOpen: this.props.isOpen,
			currentImage: 1
		}

		this.closeLightbox = this.closeLightbox.bind(this)
		this.gotoNext = this.gotoNext.bind(this)
		this.gotoPrevious = this.gotoPrevious.bind(this)
		this.handleClickImage = this.handleClickImage.bind(this)
		this.openLightbox = this.openLightbox.bind(this)
	}

	// componentWillReceiveProps(nextProps) {
	// 		if(this.props.isOpen!=nextProps) {
	// 			console.log('eg')
	// 		}
	//
	// }

	openLightbox () {
		this.setState({
			currentImage: 1,
			lightboxIsOpen: true
		})
	}

	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false
		})
	}

	gotoPrevious () {
		console.log('img', this.state.currentImage)

		this.setState({
			currentImage: this.state.currentImage - 1
		})
	}

	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1
		})
	}

	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return

		this.gotoNext()
	}

	// renderGallery () {
	// 	if (!this.props.images) return
	// 	const gallery = this.props.images.map((obj, i) => {
	// 		return (
	// 			<a
	// 				href={obj.src}
	// 				key={i}
	// 				onClick={(e) => this.openLightbox(i, e)}
	// 				style={styles.thumbnail}
	// 				>
	// 				<img
	// 					height={styles.thumbnail.size}
	// 					src={obj.thumbnail}
	// 					style={styles.thumbnailImage}
	// 					width={styles.thumbnail.size}
	// 				/>
	// 			</a>
	// 		)
	// 	})
	//
	// 	return (
	// 		<div style={styles.gallery}>
	// 			{gallery}
	// 		</div>
	// 	)
	// }


	render () {

		return (
			<div>

				<Lightbox
				  images={[
						{
					    src: 'assets/images/meow2.jpeg',
					    srcset: [
					      'assets/images/meow2.jpeg 1024w',
					    ]
					  },
					  {
					    src: 'assets/images/meow2.jpeg',
					    srcset: [
					      'assets/images/meow2.jpeg 1024w',
					    ]
					  },
						{
							src: 'assets/images/meow2.jpeg',
							srcset: [
								'assets/images/meow2.jpeg 1024w',
							]
						}
				  ]}
				  isOpen={this.state.lightboxIsOpen}
				  onClickPrev={this.gotoPrevious}
				  onClickNext={this.gotoNext}
				  onClose={this.closeLightbox}
				/>
			</div>

		)
	}
}


const THUMBNAIL_SIZE = 72

const styles = {
	gallery: {
		marginLeft: -5,
		marginRight: -5,
		overflow: 'hidden'
	},
	thumbnail: {
		backgroundSize: 'cover',
		borderRadius: 3,
		float: 'left',
		height: THUMBNAIL_SIZE,
		margin: 5,
		overflow: 'hidden',
		width: THUMBNAIL_SIZE
	},
	thumbnailImage: {
		display: 'block',
		height: 'auto',
		maxWidth: '100%'
		// height: THUMBNAIL_SIZE,
		// left: '50%',
		// position: 'relative',
		//
		// WebkitTransform: 'translateX(-50%)',
		// MozTransform:    'translateX(-50%)',
		// msTransform:     'translateX(-50%)',
		// transform:       'translateX(-50%)',
	}
}
