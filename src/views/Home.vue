<template>
	<main role="main">
        <app-search-bar @searchTag="filterPhoto"></app-search-bar>
        <section class="album py-5">
            <div class="container">
				<div
					v-if="isProcessing"
					class="alert alert-warning d-flex justify-content-center align-items-center">
					<span class="mr-2">
						Transaksi sedang diproses
					</span>
					<div class="spinner-border text-warning">
						<span class="sr-only">Loading...</span>
					</div>
				</div>
                <div class="row">
					<app-photo
						v-for="(photo, index) in filteredPhotos"
						:key="photo._id"
						:index="index"
						:photo="photo"
						@tagClicked="filterPhoto"
						@photoClicked="orderPhoto"
						></app-photo>
				</div>
			</div>
        </section>
    </main>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from '@/common/api.service';
import SearchBar from '@/components/SearchBar.vue';
import Photo from '@/components/Photo.vue';
import contractMixin from '@/common/contract.mixin';

export default {
	components: {
		appPhoto: Photo,
		appSearchBar: SearchBar,
	},
	mixins: [contractMixin],
	data() {
		return {
			photos: [],
			filteredPhotos: [],
			isProcessing: false,
		};
	},
	computed: {
		...mapGetters('drizzle', ['drizzleInstance']),
		...mapGetters('accounts', ['activeAccount']),
	},
	methods: {
		async orderPhoto(index) {
			// SC Params : ImageHash
			this.isProcessing = true;
			const choosen = this.filteredPhotos[index];
			this.createPhotoManagerContract(choosen.photoManager);
			try {
				const result = await this.drizzleInstance
					.contracts.PhotoManager
					.methods.orderLicense(choosen.imageHash)
					.send({ from: this.activeAccount });

				const {
					clientAddress, paymentAddress, paid, licenseIndex,
				} = result.events.LicensingProcess.returnValues;

				const payload = {
					clientAddress,
					paymentAddress,
					licenseIndex,
					paid,
					imageId: choosen._id,
				};

				const response = await axios.post('/order', payload);
			} catch (error) {
				console.error('Gagal membeli foto');
			} finally {
				this.isProcessing = false;
			}
		},
		filterPhoto(tag) {
			if (tag === '') {
				this.filteredPhotos = this.photos;
				return;
			}
			this.filteredPhotos = this.photos.filter((photo) => photo.tags.includes(tag));
		},
	},
	async created() {
		try {
			const response = await axios.get('/photo');
			// const baseURL = 'https://photo-markeplace-service.herokuapp.com/';
			const baseURL = 'http://localhost:3000/';

			this.photos = response.data.map((photo) => ({
				...photo,
				imgSrc: baseURL + encodeURI(photo.imagePath),
			}));

			this.filteredPhotos = [...this.photos];
		} catch (error) {
			console.error('Gagal mendapatkan foto', error);
		}
	},
};
</script>
