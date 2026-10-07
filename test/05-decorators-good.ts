class DecoratedExample {
	@Column({ type: "varchar" })
	name = "";

	@tracked
	enabled = true;

	@decorators.field()
	count = 0;

	@action
	run() {
		return this.name;
	}

	@computed
	get label() {
		return this.name;
	}

	@action
	set label(value: string) {
		this.name = value;
	}
}
