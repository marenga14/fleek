<!-- @format -->

<template>

	<section class="mx-5 px-5">
		<navBar/>
		<div class="py-5 my-5  ">
			<span class="ps-2">
			Welcome, To<span class="card-text-color ps-2 shadow-lg m-3 p-3 card-radius">NFT BOOK SELLER  </span
			><v-icon color="blue" class="ps-2 ms-2">mdi-hand-wave</v-icon>
			</span>
		
		</div>
		<v-card>
		<div class="pt-4">
			<nav style="display: flex; justify-content: space-between" class="pb-5">
				<h3 class="folder-text ps-5 "><button class="btn button-radius shadow-lg">Home</button></h3>
				 <a><button class="btn button-radius shadow-lg">Read & Earn</button> </a>
				<div>
					<v-dialog
						v-model="dialog"
						transition="dialog-top-transition"
						class="dialogue-width"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								@click="dialog = true"
								color=""
								v-bind="attrs"
								v-on="on"
								class="pe-5"
							>
								<v-icon>mdi-plus</v-icon>
								<span>List Book</span></v-btn
							>
						</template>
						<template v-model="dialog" v-slot:default="dialog">
							<v-card class="card-radius">
								<div class="unit-center">
									<p class="word">List Book</p>
									<hr />
								</div>
								<v-container >
									<form @submit="storeFile" class="my-5 py-5">
										<label class="form-label" for="form4Example1"
											>Attach document</label
										>
										<div class="form-outline mb-4 input-border">
											<input
												@change="onChanges"
												type="file"
												id="form4Example1"
												class="form-control px-5 py-5 file"
											/>
										</div>

										<label class="form-label" for="form4Example3"
											> Book Price</label
										>
										<div class="form-outline mb-4">
											<input
												class="form-control input-card"
												id="form4Example3"
												rows="4"
												v-model="price"
											/>
										</div>
										<!-- <label class="form-label" for="form4Example3"
											>Document Name</label
										>
										<div class="form-outline mb-4">
											<input
												class="form-control input-card"
												id="form4Example3"
												rows="4"
												v-model="docName"
											/>
										</div> -->

										<div class="unit-center">
											<button
												type="submit"
												class="btn btn-primary btn-block mb-4"
												style="background-color: #04c35c"
											>
												<span class="mx-5 px-5 text-white">LIST</span>
											</button>
										</div>
									</form>
								</v-container>
							</v-card>
						</template>
					</v-dialog>
				</div>
				<!-- <ConnectButton/> -->
			</nav>
		</div>
		</v-card>
		<nav
			style="display: flex; justify-content: space-between"
			class="pt-5 mt-4"
		>
		<span class="card-text-color ps-2 shadow-lg m-3 p-3 card-radius"><h3 class="folder-text">Sell, Explore and Read Books at <span style="color:green ;">Bookee</span></h3></span
			>
			
		</nav>

		
		<v-row>
			<v-hover>
				<v-col v-for="doc in documents" :key="doc.time" cols="2" sm="2" md="2">
					 
					<v-card @click="openDoc(doc.cidValue)"  class="col-card h-100" url="http://localhost:8080/ipfs/QmYBySzGhc8hJYvRSfFC9fd9q6TVwMEhAtx1DmYiWq44SP" >
						<v-img src="../assets/cover.jpeg" class="pt-2 mt-5 px-3 mx-3"></v-img
						><br />
						<!-- <div class="ps-3 ms-3">
							<span class="fol-text">path: {{doc.docValue}}</span>
						</div> -->
						<!-- <div class="ps-3 ms-3">
							<h6 class="fol-text"><span>uploaded (day)</span>{{new Date(parseInt(doc.time)).toLocaleDateString()}}</h6>
						</div> -->
						<div class="ps-3 ms-3">
							<h6 class="folder-texti">
								<span class="folder-texti">{{doc.docName}}</span><br>
								<span class="pe-1">Price:</span>{{ doc.price}} Tsh
							</h6>
						</div>
						<div style="display: flex; justify-content: space-between" >
						<button @click="openDoc(doc.cidValue)" class="p-3 btn bg-white">SUMMARY</button>
						<button style="background-color:;" class="p-2 btn card-radius shadow-lg">BUY</button>
						</div>
					</v-card>
				 
				</v-col>
			</v-hover>

			<v-hover>
				<v-col v-for="doc in documents" :key="doc.time" cols="2" sm="2" md="2">
					 
					<v-card  class="col-card h-100">
						<v-img src="../assets/c2.webp" class="pt-2 mt-5 px-3 mx-3"></v-img
						><br />
					 
						<div class="ps-3 ms-3">
							<h6 class="folder-texti">
								<span class="folder-texti">{{doc.docName}}</span><br>
								<span class="pe-1">Price:</span>{{ doc.price}} Tsh
							</h6>
						</div>
						<div style="display: flex; justify-content: space-between " >
						<button @click="openDoc(doc.cidValue)" class="p-3 btn bg-white">SUMMARY</button>
						<button style="background-color:;" class="p-2 btn card-radius shadow-lg">BUY</button>
						</div>
					</v-card>
				 
				</v-col>
			</v-hover>
			 
		</v-row>

	
	  
	</section>
</template>

<script>
import navBar from "../components/sidebar.vue"
// import { ConnectButton } from "web3uikit"
	import emitter from "tiny-emitter/instance";
	import { create } from "ipfs-client";
	import { ethers, Signer } from "ethers";
	import { abi, contractAddress,abinft,contractAddressnft } from "../../constants";

	const client = create({
		http: "/ip4/127.0.0.1/tcp/5001",
	});

	export default {
		name: "dashPage",
		components:{
			navBar,
			
		},
		props: {},
		data() {
			return {
				dialog: false,
				mem: [],
				documents: [],
				open: true,
				group: null,
				file: "",
				price: "",
				fileName: "",
				time: "",
				docName:"",
				receiveDocs:[],

			};
		},
		methods: {

			
			
			openDoc(cid){
				let baseUrlr  = "http://localhost:8081/ipfs/"
				window.open(baseUrlr + cid)


			},
			
			async userLogin() {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = await provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const user = await contract.operatorFinder(signer.getAddress());
				console.log(user)
				return user;
			},
			async onChanges(e) {
				this.file = e.target.files[0];
               console.log(this.file)
				// const cid = await client.add(file);
				// console.log(`hey hey ${cid.path}`);
			},

			async storeFile(e) {
				e.preventDefault();
				const docName= this.file.name;
				console.log(docName)
				const price = this.price;
				const cid = await client.add(this.file);
				let tokenUri ={
					name:"",
					description:"",
					image:"http://localhost:8080/ipfs/"
				}

				tokenUri = JSON.stringify(tokenUri);
				const cid2 = await client .add(tokenUri)
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				// const contractnft = new ethers.Contract(contractAddressnft, abinft, signer);

				const contract = new ethers.Contract(contractAddress, abi, signer);
			
				// const storedResponse = await contractnft.mintNft(cid2);
				const list = await contract.list(cid.path,docName,price)
				console.log(list);
				this.dialog = false;
			},

			 

			async retrieveFiles() {
				let doc = [];
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const signer = provider.getSigner();
				const contract = new ethers.Contract(contractAddress, abi, signer);
				const document = await contract.getListing();
				 
				return document;
			},
			 
			
			clicked(name, org) {
				//   this.$router.push('share/'+name)

				console.log(name);
			},
		},

		async created() {
		// 	this.mem = await this.userLogin();
		 this.documents = await this.retrieveFiles();
		// 	this.fileName = this.onChanges();
		// 	this.receivedDocs = await this.receiveDocs();
		},
	};
</script>

<style>
	.unit-center {
		display: flex;
		justify-content: center;
	}
	.coll {
		background-color:rgb(17, 37, 35);
	}

	.navbar2 {
		position: absolute;
		top: 85px;
		left: 2%;
	}

	.word {
		left: 20px;
		font-family: "Montserrat";
		font-style: normal;
		font-weight: 700;
		font-size: 48px;
		line-height: 66px;
		/* identical to box height, or 138% */

		color: #095073;
	}
	.dialogue-width {
		width: 100%;
	}
	.fol-text {
		font-family: "Inter";
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 18px;
	}
	.text {
		font-family: "Lato";
		font-style: normal;
		font-weight: 600;
	}
	.input {
		border-radius: 4px solid grey;
	}
	.table-text {
		height: 18px;
		width: 100%;
		font-family: "Lato";
		font-style: normal;
		/* font-weight: 500;
	font-size: 14px;
	line-height: 18px; */
		/* identical to box height, or 129% */

		/* Gray/500 */

		color: #667085;
	}
	.cardpos {
		display: flexbox;
		top: 30%;
		bottom: 60%;
		justify-self: center;
		background: #ffffff;
		border-radius: 20px;
	}
	.progress {
		background: #051f61;
	}
	.unit-center {
		display: flex;
		justify-content: center;
	}
	.card-text-color {
		color: #051f61;
	}
	.folder-text {
		font-family: "Lato";
		 font-size:x-small;

		/* Main color 2 */

		color: #051f61;
	}
	.col-card {
		border: 2px solid rgba(0, 0, 0, 0.06);
		border-radius: 8px;

		/* Inside auto layout */

		flex: none;
		order: 0;
		flex-grow: 0;
	}
.folder-texti{ 
    font-family: 'Times New Roman', Times, serif;
    font-size: small;
    color: #4767b8;
}
	.img-fol {
		background: linear-gradient(
				314.09deg,
				rgba(255, 255, 255, 0.2) -16.73%,
				rgba(255, 255, 255, 0) 62.3%
			),
			#1badde;
		box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.08),
			0px 2px 4px rgba(44, 43, 42, 0.1),
			inset 0px -14px 21px rgba(0, 0, 0, 0.08);
		border-radius: 7px;
	}
	.add-color {
		background: #ebf2ff;
	}

	.list-item {
		width: 211px;
		height: 42px;

		background: #d9d9d9;
		border-radius: 10px;
	}

	.card-radius{
		border: 2px solid rgb(113, 163, 238);
		border-radius: 32px;
	}

	.button-radius{
		
		border-radius: 32px;
	}
</style>
