export namespace dto {
	
	export class RepositoriesData {
	    name: string;
	    total_commits: number;
	
	    static createFrom(source: any = {}) {
	        return new RepositoriesData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.total_commits = source["total_commits"];
	    }
	}
	export class DetailRepository {
	    detail: RepositoriesData[];
	    total: number;
	    total_commits: number;
	
	    static createFrom(source: any = {}) {
	        return new DetailRepository(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detail = this.convertValues(source["detail"], RepositoriesData);
	        this.total = source["total"];
	        this.total_commits = source["total_commits"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class LanguageData {
	    name: string;
	    byte_of_codes: number;
	
	    static createFrom(source: any = {}) {
	        return new LanguageData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.byte_of_codes = source["byte_of_codes"];
	    }
	}
	export class ListTotal {
	    detail: string[];
	    total: number;
	
	    static createFrom(source: any = {}) {
	        return new ListTotal(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.detail = source["detail"];
	        this.total = source["total"];
	    }
	}
	
	export class RepositoriesResponse {
	    repository_owned: DetailRepository;
	    repository_forked: DetailRepository;
	    repository_contributed: DetailRepository;
	    total: number;
	    total_commits: number;
	
	    static createFrom(source: any = {}) {
	        return new RepositoriesResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.repository_owned = this.convertValues(source["repository_owned"], DetailRepository);
	        this.repository_forked = this.convertValues(source["repository_forked"], DetailRepository);
	        this.repository_contributed = this.convertValues(source["repository_contributed"], DetailRepository);
	        this.total = source["total"];
	        this.total_commits = source["total_commits"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Request {
	    personal_access_token: string;
	    start_date: string;
	    end_date: string;
	
	    static createFrom(source: any = {}) {
	        return new Request(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.personal_access_token = source["personal_access_token"];
	        this.start_date = source["start_date"];
	        this.end_date = source["end_date"];
	    }
	}
	export class ResponseData {
	    repositories: RepositoriesResponse;
	    followers: ListTotal;
	    followings: ListTotal;
	    unfollowers: ListTotal;
	    unfollowings: ListTotal;
	    starreds: ListTotal;
	    startgazers: ListTotal;
	    languages: LanguageData[];
	
	    static createFrom(source: any = {}) {
	        return new ResponseData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.repositories = this.convertValues(source["repositories"], RepositoriesResponse);
	        this.followers = this.convertValues(source["followers"], ListTotal);
	        this.followings = this.convertValues(source["followings"], ListTotal);
	        this.unfollowers = this.convertValues(source["unfollowers"], ListTotal);
	        this.unfollowings = this.convertValues(source["unfollowings"], ListTotal);
	        this.starreds = this.convertValues(source["starreds"], ListTotal);
	        this.startgazers = this.convertValues(source["startgazers"], ListTotal);
	        this.languages = this.convertValues(source["languages"], LanguageData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace models {
	
	export class GWAResult {
	    id: number[];
	    username: string;
	    progress: string;
	    data?: dto.ResponseData;
	    start_date: string;
	    end_date: string;
	    message: string;
	    latency: string;
	
	    static createFrom(source: any = {}) {
	        return new GWAResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.username = source["username"];
	        this.progress = source["progress"];
	        this.data = this.convertValues(source["data"], dto.ResponseData);
	        this.start_date = source["start_date"];
	        this.end_date = source["end_date"];
	        this.message = source["message"];
	        this.latency = source["latency"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

