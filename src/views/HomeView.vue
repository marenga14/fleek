<!-- @format -->

<template>
	<div class="row h-100 bg-image">
		<div class="col-md-6">
			<div class="text-big-blue">
				<div>
					<p>SECURED</p>
				</div>
			</div>
			<div class="text-big-blue2">
				<div>
					<p>DOCUMENT  enjfnfe=fefj efn ef nd fnd fd</p>
				</div>
			</div>
			<div class="form-position w-50 h-50">
				<v-dialog
					v-model="dialog"
					transition="dialog-top-transition"
					class="dialogue-width"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-btn color="" v-bind="attrs" v-on="on" class="">
							<v-icon>mdi-wallet</v-icon>

							<span class="" @click="connectWallet">Connect</span></v-btn
						>
					</template>
					<template v-model="dialog" v-slot:default="dialog">
						<v-card>
							<div class="unit-center m-2 p-1">
								<p class="word">LOGIN TO SECDOC</p>
								<hr />
							</div>
							<div class="unit-center mb-2 pb-2">
								<v-img
									src="../assets/GRAPHICS.png"
									width="97px"
									height="230"
									class="pt-5 mt-5"
								></v-img>
							</div>
							<v-container class="m-2 p-2">
								<div class="unit-center">
									<v-btn
										:to="{ path }"
										color="secondary"
										class="text-white"
										@click="userLogin"
									>
										login
									</v-btn>
								</div>
							</v-container>
						</v-card>
					</template>
				</v-dialog>
			</div>
		</div>
		<div class="col-md-6 b-righ"></div>
	</div>
</template>

<script>
	import dashboard from "../views/dashboard.vue";
	import { ethers } from "ethers";
	import { abi, contractAddress } from "../../constants";
	import { defineComponent } from "vue";
	import Dashboard from "../views/dashboard.vue";
	import emitter from "tiny-emitter/instance";

	// Components

	export default defineComponent({
		name: "HomeView",
		data() {
			return {
				dialog: false,
				orgs: {},
				path: "",
			};
		},

		components: { dashboard },
		methods: {
			// async InstitutionLogin() {
			// 	try {
			// 		const provider = new ethers.providers.Web3Provider(window.ethereum);
			// 		const signer = await provider.getSigner();
			// 		const contract = new ethers.Contract(contractAddress, abi, signer);
			// 		const orgs = await contract.testingAddress(signer.getAddress());
			// 		if (orgs.orgName != "") {
			// 			this.path = "memberAdd";

			// 			console.log(this.orgs);
			// 			emitter.emit("orgsData", { organisation: orgs });
			// 		} else {
			// 			alert("Unauthorised / unknown address");
			// 		}
			// 	} catch (error) {
			// 		console.log(error);
			// 	}

			// 	//  return {
			// 	// 	organization: orgs,
			// 	// 	path: path,
			// 	// };
			// },
			async connectWallet() {
				if (typeof window.ethereum !== "undefined") {
					await window.ethereum.request({ method: "eth_requestAccounts" });
					
				}
			},

			async userLogin() {
				let userPath;
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				
				const signer = await provider.getSigner();
				console.log(await provider.getCode(contractAddress))
				const contract = new ethers.Contract(contractAddress, abi, signer);

				try {
					const user = await contract.operatorLogin(signer.getAddress());

					if (user) {
						this.path = user;
					} else {
						alert("Unauthorised / unknown address");
					}
				} catch (err) {
					console.log(err);
				}

				return userPath;
			},
		},

		 
	});
</script>

<style scoped>
	.b-left {
		background: white;
	}

	.b-right {
		background: #1badde;
		border-left: solid white;
		border-bottom: solid transparent;
	}

	.bg-image {
		background-image: url("../assets/secdoc.png");
	}

	.text-big-blue {
		position: absolute;
		left: 7.08%;
		right: 49.17%;
		top: 12.22%;
		bottom: 73.11%;

		font-family: "Montserrat";
		font-style: normal;
		font-weight: 700;
		font-size: 64px;
		line-height: 66px;
		/* or 103% */

		display: flex;
		align-items: center;

		color: #095073;
	}

	.text-big-blue2 {
		position: absolute;
		left: 7.08%;
		right: 49.17%;
		top: 22.22%;
		bottom: 65.11%;

		font-family: "Montserrat";
		font-style: normal;
		font-weight: 700;
		font-size: 64px;
		line-height: 66px;
		/* or 103% */

		display: flex;
		align-items: center;

		color: #095073;
	}

	.form-position {
		position: absolute;
		left: 7.08%;
		right: 49.17%;
		top: 42.22%;
		bottom: 45.11%;
		width: 30%;
	}
</style>
