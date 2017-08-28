package node

import (
	"context"
	log "github.com/sirupsen/logrus"
	"sync"
)

type buildwork struct {
	what BuildRequest
	ctx  context.Context
}

type builder struct {
	builds chan *buildwork
	ctx    context.Context
	wg     *sync.WaitGroup
}

func newBuilder(ctx context.Context) builder {
	const workers = 10

	b := builder{
		builds: make(chan *buildwork, workers),
		ctx:    ctx,
		wg:     new(sync.WaitGroup),
	}

	log.WithField("workers", workers).Info("starting builder")

	for i := 0; i < workers; i++ {
		go func() {
			for {
				select {
				case bw := <-b.builds:
					handle(bw)

				case <-b.ctx.Done():
					log.Info("closing worker")
					b.wg.Done()
					return
				}
			}
		}()
		b.wg.Add(1)
	}

	return b
}
func handle(buildwork *buildwork) {
	log.Info("doing build")
}

func (b *builder) submit(bw *buildwork) {
	b.builds <- bw
}

func (b *builder) stopAwait() {
	b.wg.Wait()
}
