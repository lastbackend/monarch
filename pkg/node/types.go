package node

type BuildRequest struct {
	Source     string    `json:"source"`
	Dockerfile string    `json:"dockerfile"`
}

type DeployRequest struct {
	Cmd string    `json:"cmd"`
}
