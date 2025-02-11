import {readFileSync} from "eslint";

function t() {
	t2(`SELECT *
		FROM users`,
		[ 1, 2, 3]);
}

function t2(sql: string, params: any[]) {

}
